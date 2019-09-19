import Cookies from 'js-cookie'
import { tokenName } from '@/config'

const TokenKey = tokenName

export const getToken = () => Cookies.get(TokenKey)

export const setToken = (token: string) => Cookies.set(TokenKey, token)

export const removeToken = () => Cookies.remove(TokenKey)
