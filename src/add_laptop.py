# add_laptop.py
import json
import os

# Get the absolute path of the script's directory
script_directory = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(script_directory, 'data.js')

def add_laptop(name, description, image, seeMore, More1, More2, More3, More4, More5):
    # Check if 'data.js' file exists
    if not os.path.exists(DATA_FILE):
        print(f"Error: '{DATA_FILE}' file not found.")
        return

    # Read existing data from 'data.js' as a string
    with open(DATA_FILE, 'r') as file:
        file_content = file.read()

    # Extract the list part of the data.js content
    start_index = file_content.find('[')
    end_index = file_content.rfind(']')
    existing_data_str = file_content[start_index:end_index + 1]

    # Load existing data or initialize an empty list if the file is empty
    existing_data = json.loads(existing_data_str) if existing_data_str.strip() else []

    # Add new laptop
    new_laptop = {
        'id': len(existing_data) + 1,
        'name': name,
        'description': description,
        'image': image,
        'seeMore': seeMore,
        'More1': More1,
        'More2': More2,
        'More3': More3,
        'More4': More4,
        'More5': More5,
        'searchIdentifier': f'laptop-model-{len(existing_data) + 1}',
       
    }

    # Append new laptop data to existing data
    existing_data.append(new_laptop)

    # Save updated data
    with open(DATA_FILE, 'w') as file:
        file.write('const laptopModels = ')
        json.dump(existing_data, file, indent=2)
        file.write(';\nexport default laptopModels;')

if __name__ == '__main__':
    laptop_name = input('Enter laptop name: ')
    laptop_description = input('Enter laptop description: ')
    laptop_image = input('Enter laptop image URL: ')
    laptop_seeMore = input('SeeMore: ')
    laptop_More1 = input('More1: ')
    laptop_More2 = input('More2: ')
    laptop_More3 = input('More3: ')
    laptop_More4 = input('More4: ')
    laptop_More5 = input('More5: ')


    add_laptop(laptop_name, laptop_description, laptop_image, laptop_seeMore, laptop_More1, laptop_More2, laptop_More3, laptop_More4, laptop_More5)

    print('Laptop added successfully!')
