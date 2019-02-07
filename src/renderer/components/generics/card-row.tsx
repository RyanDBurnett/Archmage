import { observer } from "mobx-react";
import * as React from "react";
import "./cards.scss";

interface ICardRowProps {
  isEditable: boolean;
  label: string;
  value: string;
  changeHandler: (newValue: string) => void;
}

@observer
export class CardRow extends React.Component<ICardRowProps> {
  public render() {
    if (this.props.isEditable) {
      return (
        <div className="card__data">
          <span className="card__field card__label">{this.props.label}</span>
          <input
            className="card__field__editor"
            type="text"
            value={this.props.value}
            onChange={event => this.props.changeHandler(event.target.value)}
          />
        </div>
      );
    } else {
      return (
        <div className="card__data">
          <span className="card__field card__label">{this.props.label}</span>
          <span className="card__field card__value">{this.props.value}</span>
        </div>
      );
    }
  }
}
