import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const options = [
  {
    icon: 'folder-open' as const,
    text: 'Create Collection',
    onPress: () => console.log('Create Collection pressed'),
  },
  {
    icon: 'users' as const,
    text: 'Create a Share Space',
    onPress: () => console.log('Create a Share Space pressed'),
  },
];

export default function AddScreen() {
  const [link, setLink] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = ({ nativeEvent }: { nativeEvent: any }) => {
    if (nativeEvent.key === 'Backspace' && tagInput === '') {
      if (tags.length > 0) {
        handleRemoveTag(tags[tags.length - 1]);
      }
    }
  };

  const isLinkEmpty = link.trim() === '';
  const isTagsDisabled = link.trim().length < 10;

  return (
    <View style={styles.container}>
      {/* Add Link Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Link</Text>
        <TextInput
          style={styles.input}
          placeholder="https://example.com"
          value={link}
          onChangeText={setLink}
          autoCapitalize="none"
          keyboardType="url"
          placeholderTextColor="#999"
        />
      </View>

      {/* Add Tags Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Tags</Text>
        <View style={[styles.tagsContainer, isTagsDisabled && styles.disabledInput]}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
              <TouchableOpacity onPress={() => handleRemoveTag(tag)}>
                <Text style={styles.removeTagText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TextInput
            style={styles.tagInput}
            placeholder={tags.length === 0 ? 'Add tags...' : ''}
            value={tagInput}
            onChangeText={setTagInput}
            onSubmitEditing={handleAddTag}
            onKeyPress={handleKeyPress}
            autoCapitalize="none"
            placeholderTextColor="#999"
            returnKeyType="done"
            editable={!isTagsDisabled}
          />
        </View>
      </View>

      {/* Options Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Options</Text>
        {options.map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionButton} onPress={option.onPress}>
            <View style={styles.optionIconContainer}>
              <FontAwesome name={option.icon} size={20} color="#487eb0" />
            </View>
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.saveButton, isLinkEmpty && styles.disabledButton]} disabled={isLinkEmpty}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Lighter, modern background
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    height: 50,
    borderColor: '#dcdfe6',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#487eb0',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    minHeight: 50,
    borderColor: '#dcdfe6',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0eaf3', // Light blue, complements the save button
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  tagText: {
    color: '#487eb0', // Darker blue for contrast
    fontSize: 14,
    fontWeight: '500',
  },
  removeTagText: {
    color: '#487eb0',
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  tagInput: {
    flex: 1,
    minWidth: 120,
    height: 40,
    fontSize: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderColor: '#dcdfe6',
    borderWidth: 1,
    marginBottom: 10,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0eaf3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#dcdfe6',
    backgroundColor: '#f0f2f5',
  },
  disabledButton: {
    backgroundColor: '#a0b9d1',
  },
  disabledInput: {
    backgroundColor: '#e9ecef', // A darker grey to show it's disabled
    borderColor: '#ced4da',
  },
});
