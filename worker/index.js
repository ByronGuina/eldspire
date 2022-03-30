import { createEventHandler } from '@remix-run/cloudflare-workers'

import * as build from '../build'

// TODO: Cache responses/requests at the Worker level
addEventListener(
    'fetch',
    createEventHandler({
        build,
    }),
)
