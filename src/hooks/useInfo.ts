import { InfoModel } from 'components/Info';
import { NotificationType } from 'components/SnackBar';
import { useSnackBar } from 'components/SnackBar/useSnackBar';
import { useEffect, useState } from 'react';
import { RANNA_ENDPOINT, SNIPPETS_ENDPOINT } from 'services/static';
import { useStore } from 'services/store';

export function useInfo() {
  const rannaClient = useStore((s) => s.rannaClient);
  const [info, setInfo] = useState<InfoModel>();
  const { show } = useSnackBar();

  useEffect(() => {
    rannaClient
      .info()
      .then((i) => {
        const im = i as InfoModel;
        im.rannaEndpoint = RANNA_ENDPOINT;
        im.snippetsEndpoint = SNIPPETS_ENDPOINT;
        setInfo(im);
      })
      .catch((e) =>
        show('Failed loading system information.', NotificationType.ERROR)
      );
  }, []);

  return info;
}
