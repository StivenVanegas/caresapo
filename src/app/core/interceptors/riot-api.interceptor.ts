import { HttpInterceptorFn } from '@angular/common/http';

export const riotApiInterceptor: HttpInterceptorFn = (req, next) => {

  const apiKey = 'RGAPI-8f967084-c8df-48d6-a50b-940883ba80ab';

  const cloned = req.clone({
    setHeaders: {
      'X-Riot-Token': apiKey
    }
  });

  return next(cloned);
  
};
