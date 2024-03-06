import { Text, View, } from 'react-native';
import * as Theme from '../../theme';

export default function ShadowBox( {
    primaryTitle, secondaryTitle='', content
} ) {
    return (
        <View style={Theme.shadowBoxStyle}>
            <Text style={Theme.headline}>
                {primaryTitle}</Text>
            { secondaryTitle.length != 0 && 
                <Text style={Theme.grayBody}>{secondaryTitle}</Text> }
            <View style={{alignSelf: 'center'}}>
                {content}
            </View>
            
        </View>
    );
}