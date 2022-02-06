import styled from 'styled-components';
import { AppTheme } from 'theme/theme';
import { ReactComponent as Sun } from 'assets/icons/sun.svg';
import { ReactComponent as Moon } from 'assets/icons/moon.svg';
import { Switch } from 'components/Switch';
import { useStore } from 'services/store';

const StyledSwitch = styled(Switch)`
  outline: none;
`;

export const ThemeSwitch: React.FC<{}> = () => {
  const { theme, setTheme } = useStore();
  const _onSwitch = (e: boolean) =>
    setTheme(e ? AppTheme.LIGHT : AppTheme.DARK);
  return (
    <StyledSwitch
      enabled={theme === AppTheme.LIGHT}
      onSwitch={_onSwitch}
      iconEnabled={<Sun id="icon-sun" />}
      iconDisabled={<Moon id="icon-moon" />}
    />
  );
};
