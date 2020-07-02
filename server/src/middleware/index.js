import { compose } from 'ramda'
import nunjucksContext from './nunjucks_context'
import staticMiddlware from './static'
import session from './session'

/**
 * @module middleware/index - The glue that ties all of the middleware functions together
 * Since registering middleware (deliberately) mutates the Express instance in some way, shape, or form,
 * we just pipe the instance from one middleware fn to the next  =D
 */
export default compose(
    staticMiddlware,
    nunjucksContext,
    session
)
