import { createEventHandler } from '@remix-run/cloudflare-workers'
import { getPageBySlug, getPageLastEditedTime, getPageLinks } from '../app/db.server'

// @ts-ignore
import * as build from '../build'

let eventHandler = createEventHandler({ build })

// TODO: Cache responses/requests at the Worker level
addEventListener('fetch', eventHandler)

// async function handleRequest(event) {
//     let request = event.request
//     let cacheUrl = new URL(request.url)
//     let cacheKey = new Request(cacheUrl.toString(), request)
//     let cache = caches.default
//     let response = await cache.match(cacheKey)

//     if (!response) {
//         console.log(`Response for request url: ${request.url} not present in cache. Fetching and caching request.`)
//         // If not in cache, get it from origin
//         response = await fetch(request)

//         // Must use Response constructor to inherit all of response's fields
//         response = new Response(response.body, response)

//         // Cache API respects Cache-Control headers. Setting s-max-age to 10
//         // will limit the response to be in cache for 10 seconds max

//         // Any changes made to the response here will be reflected in the cached value
//         response.headers.append('Cache-Control', 's-maxage=10')

//         // Store the fetched response as cacheKey
//         // Use waitUntil so you can return the response without blocking on
//         // writing to cache
//         event.waitUntil(cache.put(cacheKey, response.clone()))
//     } else {
//         console.log(`Cache hit for: ${request.url}.`)
//     }

//     return response
// }
