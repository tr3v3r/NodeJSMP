import cookie from 'cookie';

export default function cookieParser(req, res, next) {
  req.parsedCookies = cookie.parse(req.cookie);
  next();
}
