import { PanelPlugin } from '@grafana/data';
import { Options, defaults } from './types';
import { Panel } from './panel';
import { Editor } from './editor';

export const plugin = new PanelPlugin<Options>(Panel).setDefaults(defaults).setEditor(Editor);
