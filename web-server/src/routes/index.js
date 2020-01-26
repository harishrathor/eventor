const router = SERVER.EXPRESS.Router();
const APIRouter = SERVER.EXPRESS.Router();
const path = require('path');

router.all(SERVER.all);
router.get('/', (req, res) => {
    console.log('Here we go.');
    res.sendFile(path.join(SERVER.PATHS.CLIENT_ROOT, 'index.html'));
});

router.get('/assets/*', (req, res) => {
    res.sendFile(path.join(SERVER.PATHS.CLIENT_ASSETS, req.url.replace('/assets', '')));
});

require('@modules/app/app.module.routing')(APIRouter);

router.use('/api', APIRouter);

SERVER.APP.use(router);

/* 
Status Code	Constructor Name
400	BadRequest
401	Unauthorized
402	PaymentRequired
403	Forbidden
404	NotFound
405	MethodNotAllowed
406	NotAcceptable
407	ProxyAuthenticationRequired
408	RequestTimeout
409	Conflict
410	Gone
411	LengthRequired
412	PreconditionFailed
413	PayloadTooLarge
414	URITooLong
415	UnsupportedMediaType
416	RangeNotSatisfiable
417	ExpectationFailed
418	ImATeapot
421	MisdirectedRequest
422	UnprocessableEntity
423	Locked
424	FailedDependency
425	UnorderedCollection
426	UpgradeRequired
428	PreconditionRequired
429	TooManyRequests
431	RequestHeaderFieldsTooLarge
451	UnavailableForLegalReasons
500	InternalServerError
501	NotImplemented
502	BadGateway
503	ServiceUnavailable
504	GatewayTimeout
505	HTTPVersionNotSupported
506	VariantAlsoNegotiates
507	InsufficientStorage
508	LoopDetected
509	BandwidthLimitExceeded
510	NotExtended
511	NetworkAuthenticationRequired
*/