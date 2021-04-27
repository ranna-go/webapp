import { ExecutionResponse } from '@ranna-go/ranna-ts/dist/models';
import './ResultViewer.scss';

interface ResultViewerProps {
  res: ExecutionResponse;
}

function ResultViewer(props: ResultViewerProps) {
  return (
    <div className="result-viewer">
      {props.res.stdout && (
        <div>
          <div className="heading">stdout</div>
          <div>{linebreak(props.res.stdout)}</div>
        </div>
      )}
      {props.res.stderr && (
        <div>
          <div className="heading">stderr</div>
          <div className="stderr">{linebreak(props.res.stderr)}</div>
        </div>
      )}
    </div>
  );
}

function linebreak(s: string): JSX.Element[] {
  const split = s.trim().split('\n');
  const res = split.slice(0, split.length - 1).map((l) => (
    <span>
      {l}
      <br />
    </span>
  ));
  res.push(<span>{split[split.length - 1]}</span>);
  return res;
}

export default ResultViewer;
