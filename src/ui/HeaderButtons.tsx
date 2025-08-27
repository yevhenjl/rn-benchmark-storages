import {FC} from 'react';

import {
  StyleProp,
  StyleSheet,
  StyleSheetProperties,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface HeaderButtonsProps {
  runBenchmarks: () => void;
  clearResults: () => void;
  handlePresentModal: () => void;
  benchmarksStarted: boolean;
  isResultsEmpty: boolean;
}

interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled: boolean;
  style: StyleProp<ViewStyle>;
}

const Button: FC<ButtonProps> = ({label, onPress, disabled, style}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={style}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export const HeaderButtons: FC<HeaderButtonsProps> = ({
  runBenchmarks,
  clearResults,
  benchmarksStarted,
  isResultsEmpty,
  handlePresentModal,
}) => {
  return (
    <View style={styles.buttonsContainer}>
      <Button
        label="Run Benchmarks"
        onPress={runBenchmarks}
        disabled={benchmarksStarted}
        style={styles.buttonContainer}
      />
      <Button
        label="Clear"
        onPress={clearResults}
        disabled={isResultsEmpty || benchmarksStarted}
        style={styles.buttonContainer}
      />
      {!isResultsEmpty && (
        <Button
          label="Graphs"
          onPress={handlePresentModal}
          disabled={benchmarksStarted}
          style={styles.buttonContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#9dcaeb',
  },
  buttonText: {
    color: '#000000',
  },
  disabledButton: {
    color: '#cacaca',
  },
});
