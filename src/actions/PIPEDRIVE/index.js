import webhook from './webhook'
import persons from './persons'
import deals from './deals'
import stages from './stages'
import pipelines from './pipelines'

export default {
  ...webhook,
  ...persons,
  ...deals,
  ...stages,
  ...pipelines,
}
