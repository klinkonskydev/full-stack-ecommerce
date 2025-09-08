import { Request, Response } from 'express'
export type HttpMethod = "get" | "post"

export const HttpMethod: Record<'GET' | 'POST', HttpMethod> = {
  GET: "get",
  POST: "post",
} as const

export interface Route {
  getHandler(): (request: Request, response: Response) => Promise<void>
  getPath(): string
  getMethod(): HttpMethod
}
