import {FC} from 'react';

import {FlatList, StyleSheet, Text, View} from 'react-native';

import {BenchmarkResult, BenchmarkStatus} from '../types';

interface ResultsTableProps {
  results: BenchmarkResult;
}

export const ResultsTable: FC<ResultsTableProps> = ({results}) => {
  const renderBenchmarkResult = ({item}: {item: BenchmarkStatus}) => {
    return (
      <View style={styles.resultRow}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text
          style={[
            styles.resultStatus,
            item.status === 'error' && {color: 'red'},
            item.status === 'done' && {color: 'green'},
          ]}
        >
          {item.status.toUpperCase()}
        </Text>
        <Text style={styles.resultTime}>
          {item.status === 'pending' ? 'Running...' : `${item.time?.toFixed(3)} ms`}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={Object.values(results)}
      keyExtractor={(item) => item.name}
      renderItem={renderBenchmarkResult}
    />
  );
};

const styles = StyleSheet.create({
  resultRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  resultName: {
    flex: 3,
    fontSize: 16,
  },
  resultStatus: {
    flex: 1.5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultTime: {
    flex: 2,
    fontSize: 16,
    textAlign: 'right',
  },
});
