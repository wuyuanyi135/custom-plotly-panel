import React, {Component} from 'react';
import {FormField} from '@grafana/ui';
import {PanelEditorProps} from '@grafana/data';
import {Options} from './types';

export class Editor extends Component<PanelEditorProps<Options>, { code_editor: string }> {
    constructor(props: PanelEditorProps<Options>, context: any) {
        super(props, context);
        this.state = {
            code_editor: this.props.options.code,
        };
    }

    onCodeChanged = () => {
        this.props.onOptionsChange({...this.props.options, code: this.state.code_editor});
        console.log('Code changed!');
    };

    render() {
        return (
            <div className="section gf-form-group">
                <h5 className="section-heading">Code</h5>
                <FormField
                    label="Code"
                    inputEl={
                        <textarea style={{minWidth: "600px", minHeight:"300px", backgroundColor: "#161719", color: "white"}}
                                  onChange={e => this.setState({code_editor: e.target.value})}
                                  onBlur={this.onCodeChanged} value={this.state.code_editor}
                        />
                    }
                />
            </div>
        );
    }
}
