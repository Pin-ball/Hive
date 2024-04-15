import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import PropTypes from "prop-types";

const initialState = {
  book: {
    value: [],
    cacheData: []
  },
  author: {
    value: [],
    cacheData: []
  },
  availability: ['borrow', 'available'],
  refresh: false,
  selectedBook: null,
  activeModal: null
}

const useStore = create() (
  immer((set) => ({

      ...initialState,

      seeBook: (id) =>
        set(state => {
            state.selectedBook = id
        }),
      closeBook: (id) =>
        set(state => {
            state.selectedBook = null
        }),

      setValue:(filter, value) =>
        set(state => {
          state[filter].value = value
        }),
      setCacheData: (filter, item) =>
        set(state => {
          const exist = state[filter].cacheData.some(obj => obj.id === item.id);
          if (!exist)
            state[filter].cacheData.push(item)
        }),

      setAvailability: (value) =>
        set(state => {
          state.availability = value
        }),

      showModal: (target) =>
        set(state => {
          state.activeModal = target
        }),
      hideModal: () =>
        set(state => {
        state.activeModal = null
      }),

      triggerRefresh: () =>
        set(state => {
          state.selectedBook = null
          state.refresh = !(state.refresh)
      }),

  }))
)

export default useStore;

useStore.propTypes = {
  seeBook: PropTypes.func,
  closeBook: PropTypes.func,
  setValue: PropTypes.func,
  setCacheData: PropTypes.func,
  setAvailability: PropTypes.func,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  triggerRefresh: PropTypes.func,
}
