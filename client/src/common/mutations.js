/**
 * @func setProp - Update a property on the 'state' Object
 * @example
 * >>> const isLoadingPayload = { key: 'isLoading', value: true }
 * >>> this.$store.commit('setProp', isLoadingPayload)
 */
const setProp = (state, { key, value }) => state[key] = value

/**
 * @func setProps - Update multiple properties on the state object
 * >>> const newStatePayload = { greeting: 'hi' }
 * >>> this.$store.commit('setProps', isLoadingPayload)
 *
 */
const setProps = (state, partial) =>
    Object.entries(partial)
        .forEach(([key, value])=>
            setProp(state, { key, value })
        )

/**
 * @func mergeProp - Update a property on the 'state' object by merging it with a new value
 */
const mergeProp = (state, { key, value }) => state[key] = { ...state[key], ...value }

const mergeProps = (state, partial) =>
    Object.entries(partial)
        .forEach(([key, value])=>
            mergeProp(state, { key, value })
        )


const mapProp = (state, { key, value }) => state[key] = value(state, key)


export const mutations = {
    setProp,
    setProps,
    mergeProp,
    mergeProps,
    mapProp
}

export default mutations
