import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Returns an Express middleware that validates req.body, req.query, or req.params against the provided Zod schema.
 * @param schema Zod schema to validate against
 * @param property Which property to validate: 'body', 'query', or 'params'. Defaults to 'body'.
 */
export function validate<T extends ZodSchema<any>>(
  schema: T,
  property: 'body' | 'query' | 'params' = 'body',
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req[property]);
      // Attach parsed data to req for downstream use if needed
      (req as any)[property] = result;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ error: err.errors });
        return;
      }
      next(err);
    }
  };
}
