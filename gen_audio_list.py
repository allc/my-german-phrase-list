import os


AUDIO_DIR = './public/audio/'

filenames = os.listdir(AUDIO_DIR)

for filename in filenames:
    filename = filename
    print(f'- [{filename}](https://commons.wikimedia.org/wiki/File:{filename})')
