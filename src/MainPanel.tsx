import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions, Frame } from 'types';
import StopIcon from './img/stop-icon.png';
import GoIcon from './img/go-icon.png';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props extends PanelProps<PanelOptions> {}
interface State {
  num: number;
}

export class MainPanel extends PureComponent<Props, State> {
  state: State = {
    num: 0,
  };

  componentDidMount() {
    const series = this.props.data.series as Frame[];
    if (series.length == 0 || series[0].fields[0].values.buffer.length == 0) {
      return;
    }

    this.setState({ num: series[0].fields[0].values.buffer[0] });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data.series !== this.props.data.series) {
      const series = this.props.data.series as Frame[];
      if (series.length == 0 || series[0].fields[0].values.buffer.length == 0) {
        return;
      }

      this.setState({ num: series[0].fields[0].values.buffer[0] });
    }
  }

  render() {
    const { width, height } = this.props;
    const { num } = this.state;

    return (
      <div
        style={{
          width,
          height,
          padding: 10,
        }}
      >
        <CircularProgressbarWithChildren value={num > 100 ? 100 : (num / 100) * 100}>
          {num < 70 ? (
            <img style={{ width: width / 2.2, transform: 'translateY(5px)' }} src={GoIcon} />
          ) : (
            <img style={{ width: width / 2.2, transform: 'translateY(5px)' }} src={StopIcon} />
          )}
          <div style={{ fontSize: 16, transform: 'translateY(10px)' }}>
            <strong>{num}</strong>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    );
  }
}
