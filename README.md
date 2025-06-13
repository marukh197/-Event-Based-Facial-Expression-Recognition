# Event-Based Facial Expression Recognition

A hybrid ResNet50 + LSTM pipeline for classifying facial expressions from neuromorphic and frame-based data converted into spikes/voxels.

---

## 📋 Overview

This repository implements an event-based facial expression recognition system, combining:
- **Nefer dataset** (neuromorphic event recordings)  
- **CK+ dataset** (frame-based facial expression videos)

We convert both to event streams using the V2E converter, balance classes, voxelize the events, and train a ResNet50 backbone with an LSTM head for temporal modeling.

---

## 🚀 Features

- **Multi-dataset integration**: addresses class imbalance by combining two complementary sources
- **Event-to-voxel preprocessing**: converts raw events into 3D voxel grids
- **Hybrid CNN-LSTM model**: ResNet50 for spatial encoding + LSTM for temporal dynamics
- **Standard splits**: 70% train / 20% validation / 10% test
- **High performance**: ≈ 85 % classification accuracy on held-out test data

---

## 📝 Dataset Preparation

1. **Download raw data**  
   - **Nefer** event recordings: [link/instructions]  
   - **CK+** frames: [link/instructions]

2. **Convert CK+ frames to events**  
   ```bash
   python preprocess/convert_to_events.py \
     --input-dir data/ck_plus_frames \
     --output-dir data/v2e_output/ck_plus_events

3. **Combine and balance classes**

- Merge Nefer & CK+ events under six labels:
- happy, sad, angry, confused, shocked, neutral

- Use undersampling/oversampling to even class counts.

4. **Voxelization**
   python preprocess/voxelizer.py \
  -- input-dir data/v2e_output \
  -- output-dir data/voxels \
  -- bins 10  

---

## 🏗️ Model & Training

1. Backbone: ResNet50 (pre-trained on ImageNet, modified input channels for voxel data)
2. Temporal head: single‐layer LSTM (hidden size 512)

3. Classifier: fully connected + softmax over 6 expressions

4. Train / Validation / Test split:

- 70 % train
- 20 % validation
- 10 % test

5. Hyperparameters (example):

- Batch size: 32

- Learning rate: 1e-4 (Adam optimizer)

- Epochs: 50

- Dropout: 0.5


## 📈 Results
After training, the best model achieved:

- Test accuracy: ~ 85 %
