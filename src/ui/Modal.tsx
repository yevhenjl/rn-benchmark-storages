import React, {forwardRef, useCallback, useMemo} from 'react';

import {StyleSheet} from 'react-native';

import {BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import type {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';

import {BenchmarkResult} from '../types';
import {BarCharts} from './BarCharts';

type Props = {
  results: BenchmarkResult;
};

export type Ref = BottomSheetModal;

export const Modal = forwardRef<Ref, Props>(({results}, ref) => {
  const snapPoints = useMemo(() => ['95%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      handleIndicatorStyle={{backgroundColor: '#ccc'}}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <BarCharts results={results} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
