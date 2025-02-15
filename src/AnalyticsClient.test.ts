import { postQueryToAnalyticsApi } from './AnalyticsClient'
import {
  setAnalyticsApiResponse,
  setAnalyticsNetworkError,
  setupIntegrationTestApiServer
} from '../test_utils/IntegrationTestApiServerTools'
const server = setupIntegrationTestApiServer()

describe('Analytics Client', function () {
  it('should call .json before then getting the data out of the data key before returning', async function () {
    const goodAnalyticsResponse = { data: { key: 'any string we want here' } }
    const expected = { data: goodAnalyticsResponse.data.key, errors: null }
    setAnalyticsApiResponse(server, goodAnalyticsResponse)
    const result = await postQueryToAnalyticsApi<string>("the query doesn't matter since we're mocking the service workers (msw)", 'key')
    expect(result).toEqual(expected)
  })

  it('should pass errors through', async function () {
    const badAnalyticsResponse = { errors: [{ message: 'not a valid graphql query' }] }
    const expected = { data: null, errors: [{ message: badAnalyticsResponse.errors[0].message }] }
    setAnalyticsApiResponse(server, expected)
    const result = await postQueryToAnalyticsApi("the query doesn't matter since we're mocking the service workers (msw)", '_')
    expect(result).toEqual(expected)
  })

  it('should pass network errors through like any other error', async function () {
    const error = 'The internet went boom 💥'
    const expected = { data: null, errors: [{ message: `request to http://localhost:8888/v1/graphql failed, reason: ${error}` }] }
    setAnalyticsNetworkError(server, error)
    const result = await postQueryToAnalyticsApi("the query doesn't matter since we're mocking the service workers (msw)", '_')
    expect(result).toEqual(expected)
  })
})
