import React from 'react';
import ScoreConfig from '@/components/ScoreConfig';
import { list, update } from './service';

export default () => <ScoreConfig list={list} update={update} type="credit" />;
