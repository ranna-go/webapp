import { InfoModel } from 'components/Info';
import { NotificationType } from 'components/SnackBar';
import { useSnackBar } from 'components/SnackBar/useSnackBar';
import { useEffect, useState } from 'react';
import { Ranna, RANNA_ENDPOINT, SNIPPETS_ENDPOINT } from 'services/client';

export function useInfo() {
  const [info, setInfo] = useState<InfoModel>();
  const { show } = useSnackBar();

  useEffect(() => {
    Ranna.info()
      .then((i) => {
        const im = i as InfoModel;
        im.rannaEndpoint = RANNA_ENDPOINT;
        im.snippetsEndpoint = SNIPPETS_ENDPOINT;
        setInfo(im);
      })
      .catch((e) =>
        show('Failed loading system information.', NotificationType.ERROR)
      );
  }, [show]);

  return info;
}
