import {
  all,
  fork,
} from 'redux-saga/effects'

const flatten = (arr) => (
  arr.reduce((flat, toFlatten) => (
    flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
  ), [])
)

export const forkAll = (sagas) => {
  const bound = sagas.map(([instance, instanceSagas]) => (
    instanceSagas.map((instanceMethod) => (
      instance[instanceMethod].bind(null, instance)
    ))
  ))
  /* eslint-disable redux-saga/yield-effects */
  const forked = flatten(bound).map((saga) => fork(saga))
  return all(forked)
  /* eslint-enable */
}
