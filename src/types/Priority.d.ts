import { PRIORITY } from '../constants/priority';

export type Priority = (typeof PRIORITY)[keyof typeof PRIORITY];
