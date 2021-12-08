import React from 'react';
import { FlatList, Text, View } from 'react-native';

export default function LMFlatList(props) {
	const { data, renderItem } = props;
	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			initialNumToRender={10}
			// removeClippedSubviews={true}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			ListEmptyComponent={() => {
				return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text>
						No data
					</Text>
				</View>
			}}
			{...props}
		/>
	)
}
