/**
 * This module exports the worker timer functions from the 'worker-timers' package.
 * These functions are used to create and manage timers in a web worker environment.
 */
export {
	setInterval as workerSetInterval,
	clearInterval as workerClearInterval,
	clearTimeout as workerClearTimeout,
	setTimeout as workerSetTimeout,
} from 'worker-timers';
