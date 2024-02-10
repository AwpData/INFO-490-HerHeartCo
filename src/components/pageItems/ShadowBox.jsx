import { Text, View, } from 'react-native';
import * as Theme from '../../theme';

export default function ShadowBox( {
    primaryTitle, isBold, secondaryTitle, content
} ) {
    return (
        <View style={Theme.shadowBoxStyle}>
            <Text style={isBold ? Theme.shadowBoxBoldTitle : Theme.shadowBoxTitle}>{primaryTitle}</Text>
            { secondaryTitle.length != 0 && 
                <Text style={Theme.shadowBoxSecondaryTitle}>{secondaryTitle}</Text> }
            {content}
        </View>
    );
}