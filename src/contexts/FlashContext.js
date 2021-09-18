import { createContext } from 'react'

export const FlashContext = createContext({messages: [], visible: false, type: null});