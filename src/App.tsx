import {useCallback, useRef, useState} from 'react';

import {StyleSheet, View} from 'react-native';

import {StatusBar} from 'expo-status-bar';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {benchmark, waitForGC} from './benchmarkFunctions';
import {closeExpoSQLiteDatabase, initExpoSQLite} from './storages/ExpoSQLite';
import {closeNitroSQLiteDatabase, initNitroSQLite} from './storages/NitroSQLite';
import {benchmarks} from './storages/benchmarks';
import {BenchmarkResult} from './types';
import {HeaderButtons} from './ui/HeaderButtons';
import {Modal} from './ui/Modal';
import {ResultsTable} from './ui/ResultsTable';

function Main() {
  const [results, setResults] = useState<BenchmarkResult>({});
  const [benchmarksStarted, setIsBenchmarkStarted] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const runBenchmarks = useCallback(async () => {
    setIsBenchmarkStarted(true);

    // Open DB connections
    initExpoSQLite();
    initNitroSQLite();

    // Clear previous results
    setResults({});

    for (let benchmarkName in benchmarks) {
      await waitForGC();

      setResults((currentResults) => ({
        ...currentResults,
        [benchmarkName]: {
          name: benchmarkName,
          status: 'pending',
        },
      }));

      // if (benchmarkName === 'Expo Secure Storage (async)')
      //   break;

      const result = await benchmark(benchmarks[benchmarkName]);

      setResults((currentResults) => ({
        ...currentResults,
        [benchmarkName]: {
          ...currentResults[benchmarkName],
          status: result === 0 ? 'error' : 'done',
          time: result,
        },
      }));
    }

    // Close DB connections
    await closeExpoSQLiteDatabase();
    closeNitroSQLiteDatabase();

    setIsBenchmarkStarted(false);
  }, []);

  const clearResults = useCallback(() => {
    setResults({});
  }, []);

  const isResultsEmpty = Object.keys(results).length === 0;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HeaderButtons
        runBenchmarks={runBenchmarks}
        clearResults={clearResults}
        benchmarksStarted={benchmarksStarted}
        isResultsEmpty={isResultsEmpty}
        handlePresentModal={handlePresentModal}
      />

      <ResultsTable results={results} />
      <Modal ref={bottomSheetModalRef} results={results} />
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.rootView}>
      <BottomSheetModalProvider>
        <Main />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootView: {
    flex: 1,
  },
});
