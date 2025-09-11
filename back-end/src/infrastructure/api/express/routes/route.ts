import { Request, Response } from 'express'
export type HttpMethod = "get" | "post" | "delete"

export const HttpMethod: Record<'GET' | 'POST' | 'DELETE', HttpMethod> = {
  GET: "get",
  POST: "post",
  DELETE: "delete"
} as const

export interface Route {
  getHandler(): (request: Request, response: Response) => Promise<void>
  getPath(): string
  getMethod(): HttpMethod
}
