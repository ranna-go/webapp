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
          <div>{props.res.stdout}</div>
        </div>
      )}
      {props.res.stderr && (
        <div>
          <div className="heading">stderr</div>
          <div className="stderr">{props.res.stderr}</div>
        </div>
      )}
    </div>
  );
}

export default ResultViewer;
