import * as type from '../constants/action_types';

export function openModal(data) {
    return {
      type: type.OPEN_MODAL,
      data
    }
}

export function closeModal(data) {
    return {
      type: type.CLOSE_MODAL,
      data
    }
}

export function handleChangeModal(data) {
  return {
    type: type.HANDLE_CHANGE_MODAL,
    data
  }
}

export function nextModal(data) {
  return {
    type: type.NEXT_MODAL,
    data
  }
}

export function previousModal(data) {
  return {
    type: type.PREVIOUS_MODAL,
    data
  }
}