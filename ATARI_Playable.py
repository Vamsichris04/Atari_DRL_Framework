import gymnasium as gym
import pygame
import numpy as np
import ale_py

# This is a proof of concept for the 5 atari games outlined in the current project design document.
# Each game can be played by switching the 'option' variable to the index of the desired game's file source string in 'GAME_OPTIONS'
# TODO Incorporate UI elements to streamline game selection and view stats of gameplay
# TODO Tweak key handlers to allow for continuous keyboard input for a smoother experience


GAME_OPTIONS = ["ALE/Breakout-v5","ALE/Pong-v5","ALE/SpaceInvaders-v5","ALE/Seaquest-v5","ALE/BeamRider-v5"]

# Change this value to the index of the game option you wish to demo
option = 3

# Create environment for selected game
env = gym.make(GAME_OPTIONS[option], render_mode="rgb_array")
observation_space, info = env.reset()

# intitialize pygame
pygame.init()
# Create window for game rendering
window = pygame.display.set_mode((640,840))

# initialize pygame clock to set pace of game
clock = pygame.time.Clock()

# map keys to actions
match option:
    # Key mappings for Breakout, Pong, and Space Invaders
    case 0|1|2:
        key_to_action = {
            pygame.K_LEFT: 3,   # move left
            pygame.K_RIGHT: 2,  # move right
            pygame.K_SPACE: 1,  # fire
        }
    # Key mappings for SeaQuest
    case 3:
        key_to_action = {
            pygame.K_LEFT: 4,  # move left
            pygame.K_RIGHT: 3, # move right
            pygame.K_SPACE: 1, # fire
            pygame.K_UP: 2,    # move up
            pygame.K_DOWN: 5,  # move down
        }
    # Key mappings for BeamRider
    case 4:
        key_to_action = {
            pygame.K_LEFT: 4,  # move left
            pygame.K_RIGHT: 3, # move right
            pygame.K_SPACE: 1, # fire short range laser
            pygame.K_UP: 2,    # fire long range torpedo
        }


# running game loop:
running = True
done = False
while running:
    action = 0

    # handle events
    for event in pygame.event.get():
        # player action event
        if event.type == pygame.KEYDOWN:
            if event.key in key_to_action:
                action = key_to_action[event.key]

        # end game event
        elif event.type == pygame.QUIT:
            running = False

    # step gymnasium environment
    observation_space, reward, terminated, truncated, info = env.step(action)

    # render frame from observation space
    frame = env.render() # gives RGB array
    # transpose frame to fit larger window (160,210) -> (640,840)
    frame = np.transpose(frame, (1, 0, 2))
    surface = pygame.surfarray.make_surface(frame)
    surface = pygame.transform.scale(surface, (640,840))

    # draw frame to pygame window
    window.blit(surface, (0, 0))
    pygame.display.flip()
    clock.tick(30)

    # reset environment when game is over
    if terminated or truncated:
        observation_space, info = env.reset()

env.close()
pygame.quit()