import { useSelector } from 'react-redux';
import { Colors } from '../theme/Colors';

type ColorTheme = typeof Colors.light;

export function useAppColors(): ColorTheme {
  const mode = useSelector((state: any) => state.Theme?.mode || 'light');
  return mode === 'dark' ? Colors.dark : Colors.light;
}