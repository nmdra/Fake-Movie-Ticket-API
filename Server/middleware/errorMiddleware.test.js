import errorMiddleware from './errorMiddleware';
import { jest } from '@jest/globals';

describe('errorMiddleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      method: 'GET',
      originalUrl: '/test-url'
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return detailed error in development mode', () => {
    process.env.NODE_ENV = 'dev';
    
    const error = new Error('Test error');
    error.statusCode = 400;
    
    errorMiddleware(error, req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Test error',
      statusCode: 400,
      method: 'GET',
      requestUrl: '/test-url',
      stack: error.stack
    });
    expect(next).toHaveBeenCalled();
  });

  it('should return generic error in production mode', () => {
    process.env.NODE_ENV = 'production';

    const error = new Error('Test error');
    error.statusCode = 400;

    errorMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Test error',
    });
    expect(next).toHaveBeenCalled();
  });

  it('should default to status 500 if no status code is provided', () => {
    process.env.NODE_ENV = 'production';

    const error = new Error('Test error');

    errorMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Test error',
    });
    expect(next).toHaveBeenCalled();
  });
});
