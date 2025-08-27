import React, {useEffect, useState} from 'react';

import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {BarChart} from 'react-native-gifted-charts';

import {BenchmarksType} from '../storages/benchmarks';
import {BenchmarkStatus} from '../types';

const BAR_WIDTH = 15;
const SPACING = 10;

type ChartsScreenProps = {
  results: Record<string, BenchmarkStatus>;
};

const pastelColors = [
  '#A1E5D4',
  '#B8E9D4',
  '#D0EDD4',
  '#E8F2D4',
  '#F0E6D4',
  '#F0D4D4',
  '#D4C4E3',
  '#BCA9D4',
  '#A48ED4',
  '#8C73D4',
  '#7458D4',
];

type ChartDataType = {
  value: number;
  label: string;
  originalLabel: BenchmarksType;
  frontColor: string;
};

type TabProps = 'All' | 'DB' | 'KV';

export const BarCharts = ({results}: ChartsScreenProps) => {
  const [processedData, setProcessedData] = useState<Omit<ChartDataType, 'label'>[]>([]);
  const [chartData, setChartData] = useState<ChartDataType[]>([]);
  const [activeTab, setActiveTab] = useState<TabProps>('All');

  useEffect(() => {
    const resultsArray = Object.values(results);

    const formattedData = resultsArray
      .filter((item) => item.status === 'done' && item.time && item.time > 0)
      .sort((a, b) => a.time! - b.time!) // Сортування ASC
      .map((item, index) => ({
        value: Math.floor(item.time!),
        originalLabel: item.name,
        frontColor: pastelColors[index % pastelColors.length],
      }));

    setProcessedData(formattedData);
  }, [results]);

  useEffect(() => {
    filterAndRelabelData(activeTab);
  }, [processedData, activeTab]);

  const isDbStorage = (label: BenchmarksType) => {
    const dbKeywords = ['DB', 'SQLite', 'Realm'];
    return dbKeywords.some((keyword) => label.includes(keyword));
  };

  const filterAndRelabelData = (tab: TabProps) => {
    let filteredData;

    if (tab === 'All') {
      filteredData = processedData;
    } else if (tab === 'DB') {
      filteredData = processedData.filter((item) => isDbStorage(item.originalLabel));
    } else {
      // 'KV'
      filteredData = processedData.filter((item) => !isDbStorage(item.originalLabel));
    }

    const relabeledData = filteredData.map((item, index) => ({
      ...item,
      label: `${index + 1}`,
    }));

    setChartData(relabeledData);
  };

  const renderLegend = () => (
    <View style={styles.legendContainer}>
      <Text style={styles.legendTitle}>Legend:</Text>
      {chartData.map((item) => (
        <View key={item.originalLabel} style={styles.legendItem}>
          <View style={[styles.legendColorBox, {backgroundColor: item.frontColor}]} />
          <Text style={styles.legendText}>
            {`${item.label}) ${item.originalLabel}, ${item.value}ms`}
          </Text>
        </View>
      ))}
    </View>
  );

  const chartWidth = chartData.length * (BAR_WIDTH + SPACING);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeTab === 'All' && styles.activeButton]}
          onPress={() => setActiveTab('All')}
        >
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeTab === 'KV' && styles.activeButton]}
          onPress={() => setActiveTab('KV')}
        >
          <Text style={styles.buttonText}>Key-value storage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeTab === 'DB' && styles.activeButton]}
          onPress={() => setActiveTab('DB')}
        >
          <Text style={styles.buttonText}>DB storage</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartOuterContainer}>
        {chartData.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <BarChart
              data={chartData}
              width={chartWidth}
              barWidth={BAR_WIDTH}
              spacing={SPACING}
              rulesType="solid"
              xAxisThickness={0}
              yAxisThickness={0}
              yAxisTextStyle={{color: 'gray'}}
              noOfSections={5}
              yAxisLabelWidth={40}
              initialSpacing={10}
            />
          </ScrollView>
        ) : (
          <Text style={styles.noDataText}>No data to display</Text>
        )}
      </View>

      {renderLegend()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    gap: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  activeButton: {
    backgroundColor: '#d0d0d0',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  chartOuterContainer: {
    marginTop: 20,
    paddingLeft: 10,
    minHeight: 250,
  },
  chartContainer: {
    marginTop: 20,
    paddingLeft: 10,
    width: '100%',
  },
  legendContainer: {
    marginTop: 30,
    paddingBottom: 40,
    width: '100%',
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 14,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray'
  }
});
