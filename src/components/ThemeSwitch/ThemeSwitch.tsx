import styled from 'styled-components';
import { AppTheme } from 'theme/theme';
import { ReactComponent as Sun } from 'assets/icons/sun.svg';
import { ReactComponent as Moon } from 'assets/icons/moon.svg';

interface Props {
  theme: AppTheme;
  onSwitch: (v: AppTheme) => void;
}

const HEIGHT = '1.5rem';

const Container = styled.button`
  height: ${HEIGHT};
  width: calc(${HEIGHT} * 2);
  border-radius: ${HEIGHT};
  background-color: ${(p) => p.theme.darkGray};
  border: none;
  padding: none;
  cursor: pointer;
  display: flex;
  padding: 0;
`;

const Nob = styled.div<{ dark: boolean }>`
  height: ${HEIGHT};
  width: ${HEIGHT};
  border-radius: ${HEIGHT};
  background-color: ${(p) => p.theme.accent};
  margin-left: ${(p) => (p.dark ? '0%' : '50%')};
  position: relative;

  &,
  > * {
    transition: all 0.25s ease;
  }

  > * {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0.2rem;
  }

  > #icon-moon {
    opacity: ${(p) => (p.dark ? '100%' : '0%')};
  }

  > #icon-sun {
    opacity: ${(p) => (p.dark ? '0%' : '100%')};
  }
`;

export const ThemeSwitch: React.FC<Props> = ({ theme, onSwitch }) => {
  const _onSwitch = () =>
    onSwitch(theme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK);
  return (
    <Container onClick={_onSwitch}>
      <Nob dark={theme === AppTheme.DARK}>
        <Moon id="icon-moon" />
        <Sun id="icon-sun" />
      </Nob>
    </Container>
  );
};
