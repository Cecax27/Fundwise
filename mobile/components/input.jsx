import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/useTheme";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  focusColor,
  icon = null,
  numeric = false,
  email = false,
  text = false,
  autoCapitalize = 'sentences',
  keyboardType = 'default',
  secureTextEntry = false,
  textContentType ='none',
  autoComplete ='off',
}) {
  const { theme } = useTheme();
  const borderColor = focusColor || theme.border;

  const [focus, setFocus] = useState(false);

  return (
    <View style={{ padding: 10, flexDirection:'row' }}>
      <View
        style={{
          borderWidth: focus ? 2 : 1,
          borderRadius: 25,
          borderColor: focus ? borderColor : theme.border,
          height: 50,
          justifyContent: "center",
          paddingHorizontal: 8,
          flex:1
        }}
      >
        <Text
          style={{
            position: "absolute",
            top: -10,
            left: 25,
            backgroundColor: theme.background,
            color: theme.border,
            paddingHorizontal: 6,
            fontSize: 11,
            fontFamily: focus?'Montserrat-SemiBold':'Montserrat-Regular'
          }}
        >
          {label}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flex:1
          }}
        >
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginLeft:8}}>
                {icon && (
                    <MaterialIcons name={icon} color={theme.border} size={18} style={{marginRight:4}}/>
                )}
                <TextInput
                    style={{ outlineWidth: 0, color:theme.text, fontFamily: 'Montserrat-Medium', fontSize:14, width:250 }}
                    placeholder={placeholder}
                    placeholderTextColor={theme.border}
                    inputMode={numeric ? "numeric" : email ? "email" : "text"}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    selectionColor={theme.primary}
                    value={value}
                    onChangeText={(text) => onChange(text)}
                    autoCapitalize={autoCapitalize}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    scrollEnabled
                />    
            </View>
          <TouchableOpacity onPress={() => onChange("")} style={{marginRight:6}}>
            <MaterialIcons name="clear" color={theme.border} size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
