import React from 'react';

interface IProps {
    label: string;
    type: 'text' | `password`;
    value: string;
    onChangeText: (value: string) => void;
};

/**
 * ラベル付きのテキストボックスを提供する
 */
export class TextBox extends React.Component<IProps, {}> {
    public render() {
        const label = (!!this.props.label) ?
            <label>{this.props.label}</label> :
            null;
        return (
            <span>
                {label}
                <input name="username" type={this.props.type} value={this.props.value} onChange={this.onChangeText} />
            </span>
        );
    }

    private onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChangeText(e.target.value);
    }
}