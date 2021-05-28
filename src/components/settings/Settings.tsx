import { StringMap } from '@ranna-go/ranna-ts';
import { useEffect, useState } from 'react';
import { useStore } from '../../services/store';
import './Settings.scss';

export default function Settings() {
  const setShowSettings = useStore((s) => s.setShowSettings);
  const [args, setArgs] = useStore((s) => [s.args, s.setArgs]);
  const [env, setEnv] = useStore((s) => [s.env, s.setEnv]);
  const [bypassCache, setBypassCache] = useStore((s) => [
    s.bypassCache,
    s.setBypassCache,
  ]);

  const [envInpt, setEnvInpt] = useState('');

  function onContainerClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if ((e.target as HTMLElement).id !== 'settings-container') return;
    e.stopPropagation();
    e.preventDefault();
    setShowSettings(false);
  }

  function onEnvBlur() {
    const m: StringMap = {};
    envInpt
      .split('\n')
      .map((l) => l.split('='))
      .filter((s) => s.length > 1)
      .forEach((s) => (m[s[0]] = s[1]));
    setEnv(m);
  }

  useEffect(() => {
    const envParsed = Object.keys(env)
      .map((k) => `${k}=${env[k]}`)
      .join('\n');
    setEnvInpt(envParsed);
  }, [env]);

  return (
    <div id="settings-container" onClick={(e) => onContainerClick(e)}>
      <div id="asd">
        <h2>Settings</h2>
        <div>
          <p className="label">Arguments</p>
          <input
            placeholder="arg1 arg2 ..."
            value={args.join(' ')}
            onInput={(e) => setArgs(e.currentTarget.value.split(' '))}
          />
        </div>
        <div>
          <p className="label">Environment Variables</p>
          <textarea
            placeholder="key=value"
            value={envInpt}
            onInput={(e) => setEnvInpt(e.currentTarget.value)}
            onBlur={() => onEnvBlur()}
          />
        </div>
        <div>
          <input
            id="cb-bypasscache"
            type="checkbox"
            checked={bypassCache}
            onChange={(e) => setBypassCache(e.currentTarget.checked)}
          />
          <label htmlFor="cb-bypasscache">Bypass Cache</label>
        </div>
      </div>
    </div>
  );
}
