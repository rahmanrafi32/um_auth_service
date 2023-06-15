import express from 'express'

export type routerMap = {
  path: string
  route: express.Router
}
