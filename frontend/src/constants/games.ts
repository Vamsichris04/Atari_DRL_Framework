import { Game } from '@/types';
import adventure from '@/images/adventure.gif';
import air_raid from '@/images/air_raid.gif';
import alien from '@/images/alien.gif';
import amidar from '@/images/amidar.gif';
import assault from '@/images/assault.gif';
import asterix from '@/images/asterix.gif';
import asteroids from '@/images/asteroids.gif';
import atlantis from '@/images/atlantis.gif';
import atlantis2 from '@/images/atlantis2.gif';
import backgammon from '@/images/backgammon.gif';
import bank_heist from '@/images/bank_heist.gif';
import basic_math from '@/images/basic_math.gif';
import battle_zone from '@/images/battle_zone.gif';
import beam_rider from '@/images/beam_rider.gif';
import berzerk from '@/images/berzerk.gif';
import blackjack from '@/images/blackjack.gif';
import bowling from '@/images/bowling.gif';
import boxing from '@/images/boxing.gif';
import breakout from '@/images/breakout.gif';
import carnival from '@/images/carnival.gif';
import casino from '@/images/casino.gif';
import centipede from '@/images/centipede.gif';
import chopper_command from '@/images/chopper_command.gif';
import crazy_climber from '@/images/crazy_climber.gif';
import crossbow from '@/images/crossbow.gif';
import darkchambers from '@/images/darkchambers.gif';
import defender from '@/images/defender.gif';
import demon_attack from '@/images/demon_attack.gif';
import donkey_kong from '@/images/donkey_kong.gif';
import double_dunk from '@/images/double_dunk.gif';
import earthworld from '@/images/earthworld.gif';
import elevator_action from '@/images/elevator_action.gif';
import enduro from '@/images/enduro.gif';
import entombed from '@/images/entombed.gif';
import et from '@/images/et.gif';
import fishing_derby from '@/images/fishing_derby.gif';
import flag_capture from '@/images/flag_capture.gif';
import freeway from '@/images/freeway.gif';
import frogger from '@/images/frogger.gif';
import frostbite from '@/images/frostbite.gif';
import galaxian from '@/images/galaxian.gif';
import gopher from '@/images/gopher.gif';
import gravitar from '@/images/gravitar.gif';
import hangman from '@/images/hangman.gif';
import haunted_house from '@/images/haunted_house.gif';
import hero from '@/images/hero.gif';
import human_cannonball from '@/images/human_cannonball.gif';
import ice_hockey from '@/images/ice_hockey.gif';
import jamesbond from '@/images/jamesbond.gif';
import journey_escape from '@/images/journey_escape.gif';
import kaboom from '@/images/kaboom.gif';
import kangaroo from '@/images/kangaroo.gif';
import keystone_kapers from '@/images/keystone_kapers.gif';
import king_kong from '@/images/king_kong.gif';
import klax from '@/images/klax.gif';
import koolaid from '@/images/koolaid.gif';
import krull from '@/images/krull.gif';
import kung_fu_master from '@/images/kung_fu_master.gif';
import laser_gates from '@/images/laser_gates.gif';
import lost_luggage from '@/images/lost_luggage.gif';
import mario_bros from '@/images/mario_bros.gif';
import miniature_golf from '@/images/miniature_golf.gif';
import montezuma_revenge from '@/images/montezuma_revenge.gif';
import mr_do from '@/images/mr_do.gif';
import ms_pacman from '@/images/ms_pacman.gif';
import name_this_game from '@/images/name_this_game.gif';
import othello from '@/images/othello.gif';
import pacman from '@/images/pacman.gif';
import phoenix from '@/images/phoenix.gif';
import pitfall from '@/images/pitfall.gif';
import pitfall2 from '@/images/pitfall2.gif';
import pong from '@/images/pong.gif';
import pooyan from '@/images/pooyan.gif';
// import private_eye from '@/images/private_eye.gif'; // Corrupted GIF - commented out
import qbert from '@/images/qbert.gif';
import riverraid from '@/images/riverraid.gif';
import road_runner from '@/images/road_runner.gif';
import robotank from '@/images/robotank.gif';
import seaquest from '@/images/seaquest.gif';
import sir_lancelot from '@/images/sir_lancelot.gif';
// import skiing from '@/images/skiing.gif'; // Corrupted GIF - commented out
import solaris from '@/images/solaris.gif';
import space_invaders from '@/images/space_invaders.gif';
import space_war from '@/images/space_war.gif';
import star_gunner from '@/images/star_gunner.gif';
import superman from '@/images/superman.gif';
import surround from '@/images/surround.gif';
import tennis from '@/images/tennis.gif';
import tetris from '@/images/tetris.gif';
import tic_tac_toe_3d from '@/images/tic_tac_toe_3d.gif';
import time_pilot from '@/images/time_pilot.gif';
import trondead from '@/images/trondead.gif';
// import turmoil from '@/images/turmoil.gif'; // Corrupted GIF - commented out
import tutankham from '@/images/tutankham.gif';
import up_n_down from '@/images/up_n_down.gif';
import venture from '@/images/venture.gif';
import video_checkers from '@/images/video_checkers.gif';
import video_chess from '@/images/video_chess.gif';
import video_cube from '@/images/video_cube.gif';
import video_pinball from '@/images/video_pinball.gif';
import wizard_of_wor from '@/images/wizard_of_wor.gif';
import word_zapper from '@/images/word_zapper.gif';
import yars_revenge from '@/images/yars_revenge.gif';
import zaxxon from '@/images/zaxxon.gif';

const ALL_ACTIONS = [
  { action: 15, label: 'UPLEFTFIRE' },
  { action: 10, label: 'UPFIRE' },
  { action: 14, label: 'UPRIGHTFIRE' },
  { action: 7, label: 'UPLEFT' },
  { key: 'w', action: 2, label: 'UP (W)' },
  { action: 6, label: 'UPRIGHT' },
  { key: 'a', action: 4, label: 'LEFT (A)' },
  { key: '2', action: 1, label: 'FIRE (2)' },
  { key: 'd', action: 3, label: 'RIGHT (D)' },
  { action: 12, label: 'LEFTFIRE' },
  { key: '1', action: 0, label: 'NOOP (1)' },
  { action: 11, label: 'RIGHTFIRE' },
  { action: 9, label: 'DOWNLEFT' },
  { key: 's', action: 5, label: 'DOWN (S)' },
  { action: 8, label: 'DOWNRIGHT' },
  { action: 17, label: 'DOWNLEFTFIRE' },
  { action: 13, label: 'DOWNFIRE' },
  { action: 16, label: 'DOWNRIGHTFIRE' },
];

export const GAMES: Game[] = [
  {
    name: 'ALE/Adventure-v5',
    description:
      'You must find the enchanted chalice and return it to the golden castle. You can pick up various objects (keys, a sword,a bridge, or a magnet) and have to fight or outmanoeuvre dragons.',
    image: adventure,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/AirRaid-v5',
    description:
      'You control a ship that can move sideways. You must protect two buildings (one on the right and one on the left side of the screen) from flying saucers that are trying to drop bombs on them.',
    image: air_raid,
    actions: [
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 5, label: 'LEFTFIRE' },
      { action: 4, label: 'RIGHTFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Alien-v5',
    description:
      'You are stuck in a maze-like spaceship with three aliens. You goal is to destroy their eggs that are scattered all over the ship while simultaneously avoiding the aliens (they are trying to kill you). You have a flamethrower that can help you turn them away in tricky situations. Moreover, you can occasionally collect a power-up (pulsar) that gives you the temporary ability to kill aliens.',
    image: alien,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Amidar-v5',
    description:
      'This game is similar to Pac-Man, you are trying to visit all places on a 2-dimensional grid while simultaneously avoiding your enemies. You can turn the tables at one point in the game with your enemies turn into chickens and you can catch them.',
    image: amidar,
    actions: [
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'w', action: 2, label: 'UP (W)' },
      { action: 6, label: 'UPFIRE' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { action: 8, label: 'LEFTFIRE' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { action: 7, label: 'RIGHTFIRE' },
      { key: 's', action: 5, label: 'DOWN (S)' },
      { action: 9, label: 'DOWNFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Assault-v5',
    description:
      'You control a vehicle that can move sideways. A big mother ship circles overhead and continually deploys smaller drones. You must destroy these enemies and dodge their attacks.',
    image: assault,
    actions: [
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 'w', action: 2, label: 'UP (W)' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { action: 6, label: 'LEFTFIRE' },
      { action: 5, label: 'RIGHTFIRE' },
      { key: '2', action: 1, label: 'FIRE (2)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Asterix-v5',
    description:
      'You are Asterix and can move horizontally (continuously) and vertically (discretely). Objects move horizontally across the screen including lyres and other (more useful) objects. Your goal is to guideAsterix in such a way as to avoid lyres and collect as many other objects as possible. You score points by collecting objects and lose a life whenever you collect a lyre. You have three lives available at the beginning. If you score sufficiently many points, you will be awarded additional points.',
    image: asterix,
    actions: [
      { action: 6, label: 'UPLEFT' },
      { key: 'w', action: 1, label: 'UP (W)' },
      { action: 5, label: 'UPRIGHT' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 8, label: 'DOWNLEFT' },
      { key: 's', action: 4, label: 'DOWN (S)' },
      { action: 7, label: 'DOWNRIGHT' },
    ],
  },
  {
    name: 'ALE/Asteroids-v5',
    description:
      'You control a spaceship in an asteroid field and must break up asteroids by shooting them. Once all asteroids are destroyed, you enter a new level and new asteroids will appear. You will occasionally be attacked by a flying saucer.',
    image: asteroids,
    actions: [
      { action: 13, label: 'UPLEFTFIRE' },
      { action: 8, label: 'UPFIRE' },
      { action: 12, label: 'UPRIGHTFIRE' },
      { action: 7, label: 'UPLEFT' },
      { key: 'w', action: 2, label: 'UP (W)' },
      { action: 6, label: 'UPRIGHT' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { action: 10, label: 'LEFTFIRE' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { action: 9, label: 'RIGHTFIRE' },
      { action: 11, label: 'DOWNFIRE' },
      { key: 's', action: 5, label: 'DOWN (S)' },
    ],
  },
  {
    name: 'ALE/Atlantis-v5',
    description:
      'Your job is to defend the submerged city of Atlantis. Your enemies slowly descend towards the city and you must destroy them before they reach striking distance. To this end, you control three defense posts. You lose if your enemies manage to destroy all seven of Atlantis’ installations. You may rebuild installations after you have fought of a wave of enemies and scored a sufficient number of points.',
    image: atlantis,
    actions: [
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { action: 3, label: 'LEFTFIRE' },
      { action: 2, label: 'RIGHTFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Atlantis2-v5',
    description:
      'Your job is to defend the submerged city of Atlantis. Your enemies slowly descend towards the city and you must destroy them before they reach striking distance. To this end, you control three defense posts. You lose if your enemies manage to destroy all seven of Atlantis’ installations. You may rebuild installations after you have fought of a wave of enemies and scored a sufficient number of points.',
    image: atlantis2,
    actions: [
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { action: 3, label: 'LEFTFIRE' },
      { action: 2, label: 'RIGHTFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Backgammon-v5',
    description:
      'Your goal is to move all your pieces off the board (called ‘bearing off’). Players take turns rolling dice and moving their pieces.',
    image: backgammon,
    actions: [
      { key: 'a', action: 2, label: 'LEFT (A)' },
      { key: '2', action: 0, label: 'FIRE (2)' },
      { key: 'd', action: 1, label: 'RIGHT (D)' },
    ],
  },
  {
    name: 'ALE/BankHeist-v5',
    description:
      'You are a bank robber and (naturally) want to rob as many banks as possible. You control your getaway car and must navigate maze-like cities. The police chases you and will appear whenever you rob a bank. You may destroy police cars by dropping sticks of dynamite. You can fill up your gas tank by entering a new city. At the beginning of the game you have four lives. Lives are lost if you run out of gas, are caught by the police,or run over the dynamite you have previously dropped.',
    image: bank_heist,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/BasicMath-v5',
    description:
      'You must solve basic math problems using a joystick to scroll to the correct numeric answer.',
    image: basic_math,
    actions: [
      { key: 'w', action: 2, label: 'UP (W)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { key: 's', action: 5, label: 'DOWN (S)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/BattleZone-v5',
    description:
      'You control a tank and must destroy enemy vehicles. This game is played in a first-person perspective and creates a 3D illusion. A radar screen shows enemies around you. You start with 5 lives and gain up to 2 extra lives if you reach a sufficient score.',
    image: battle_zone,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/BeamRider-v5',
    description:
      'You control a space-ship that travels forward at a constant speed. You can only steer it sideways between discrete positions. Your goal is to destroy enemy ships, avoid their attacks and dodge space debris.',
    image: beam_rider,
    actions: [
      {
        action: 6,
        label: 'UPLEFT',
      },
      {
        key: 'w',
        action: 2,
        label: 'UP (W)',
      },
      {
        action: 5,
        label: 'UPRIGHT',
      },
      {
        key: 'a',
        action: 4,
        label: 'LEFT (A)',
      },
      {
        key: '2',
        action: 1,
        label: 'FIRE (2)',
      },
      {
        key: 'd',
        action: 3,
        label: 'RIGHT (D)',
      },
      {
        action: 8,
        label: 'LEFTFIRE',
      },
      {
        key: '1',
        action: 0,
        label: 'NOOP (1)',
      },
      {
        action: 7,
        label: 'RIGHTFIRE',
      },
    ],
  },
  {
    name: 'ALE/Berzerk-v5',
    description:
      'You are stuck in a maze with evil robots. You must destroy them and avoid touching the walls of the maze, as this will kill you. You may be awarded extra lives after scoring a sufficient number of points, depending on the game mode. You may also be chased by an undefeatable enemy, Evil Otto, that you must avoid. Evil Otto does not appear in the default mode.',
    image: berzerk,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Blackjack-v5',
    description:
      'Compete against a dealer to draw cards and score as close to 21 as possible without going over (‘bust’).',
    image: blackjack,
    actions: [
      { key: 'w', action: 2, label: 'UP (W)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 's', action: 3, label: 'DOWN (S)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Bowling-v5',
    description:
      'Your goal is to score as many points as possible in the game of Bowling. A game consists of 10 frames and you have two tries per frame. Knocking down all pins on the first try is called a “strike”. Knocking down all pins on the second roll is called a “spar”. Otherwise, the frame is called “open”.',
    image: bowling,
    actions: [
      { key: 'w', action: 2, label: 'UP (W)' },
      { action: 4, label: 'UPFIRE' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 's', action: 3, label: 'DOWN (S)' },
      { action: 5, label: 'DOWNFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Boxing-v5',
    description:
      'You fight an opponent in a boxing ring. You score points for hitting the opponent. If you score 100 points, your opponent is knocked out.',
    image: boxing,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Breakout-v5',
    description:
      'You move a paddle and hit the ball in a brick wall at the top of the screen. Your goal is to destroy the brick wall. You can try to break through the wall and let the ball wreak havoc on the other side, all on its own! You have five lives.',
    image: breakout,
    actions: [
      {
        key: '1',
        action: 0,
        label: 'NOOP (1)',
      },
      {
        key: '2',
        action: 1,
        label: 'FIRE (2)',
      },
      {
        key: 'a',
        action: 3,
        label: 'LEFT (A)',
      },
      {
        key: 'd',
        action: 2,
        label: 'RIGHT (D)',
      },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Carnival-v5',
    description:
      'This is a “shoot ‘em up” game. Targets move horizontally across the screen and you must shoot them. You are in control of a gun that can be moved horizontally. The supply of ammunition is limited and chickens may steal some bullets from you if you don’t hit them in time.',
    image: carnival,
    actions: [
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { action: 5, label: 'LEFTFIRE' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 4, label: 'RIGHTFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Casino-v5',
    description:
      'This is actually several games packaged together. Games 1 and 2 are Blackjack, where the second allows card splitting (which is when a player splits their cards into two groups and plays two hands simultaneously). Game 3 is stud poker, which involves drawing cards, betting, and attempting to get the highest scoring poker hand. Game 4 is poker solitaire, which involves filling a 5 by 5 matrix with cards and scoring the poker hands formed by the rows.',
    image: casino,
    actions: [
      { key: 'w', action: 2, label: 'UP (W)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 's', action: 3, label: 'DOWN (S)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Centipede-v5',
    description:
      'You are an elf and must use your magic wands to fend off spiders, fleas and centipedes. Your goal is to protect mushrooms in an enchanted forest. If you are bitten by a spider, flea or centipede, you will be temporally paralyzed and you will lose a magic wand. The game ends once you have lost all wands. You may receive additional wands after scoring a sufficient number of points.',
    image: centipede,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/ChopperCommand-v5',
    description:
      'You control a helicopter and must protect truck convoys. To that end, you need to shoot down enemy aircraft. A mini-map is displayed at the bottom of the screen.',
    image: chopper_command,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/CrazyClimber-v5',
    description:
      'You are a climber trying to reach the top of four buildings, while avoiding obstacles like closing windows and falling objects. When you receive damage (windows closing or objects) you will fall and lose one life; you have a total of 5 lives before the end games. At the top of each building, there’s a helicopter which you need to catch to get to the next building. The goal is to climb as fast as possible while receiving the least amount of damage.',
    image: crazy_climber,
    actions: [
      { action: 6, label: 'UPLEFT' },
      { key: 'w', action: 1, label: 'UP (W)' },
      { action: 5, label: 'UPRIGHT' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 8, label: 'DOWNLEFT' },
      { key: 's', action: 4, label: 'DOWN (S)' },
      { action: 7, label: 'DOWNRIGHT' },
    ],
  },
  {
    name: 'ALE/Crossbow-v5',
    description:
      'You must retrieve stolen treasures from the Evil Master’s castle. Along the way you face enemies who you can shoot at with a crossbow.',
    image: crossbow,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Darkchambers-v5',
    description:
      'You must survive 26 levels of enemies and curses and collect as much treasure as you can along the way.',
    image: darkchambers,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Defender-v5',
    description:
      'Aliens attack the earth. You control a spaceship and must defend humanity by destroying alien ships and rescuing humanoids. You have three lives and three smart bombs. You lose a live when you are shot down by an alien spaceship. Points are scored by destroying enemies and retrieving humans that are being abducted. You have an unlimited number of laser missiles.',
    image: defender,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/DemonAttack-v5',
    description:
      'You are facing waves of demons in the ice planet of Krybor. Points are accumulated by destroying demons. You begin with 3 reserve bunkers, and can increase its number (up to 6) by avoiding enemy attacks. Each attack wave you survive without any hits, grants you a new bunker. Every time an enemy hits you, a bunker is destroyed. When the last bunker falls, the next enemy hit will destroy you and the game ends.',
    image: demon_attack,
    actions: [
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { action: 5, label: 'LEFTFIRE' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 4, label: 'RIGHTFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/DonkeyKong-v5',
    description:
      'You play as Mario trying to save your girlfriend who has been kidnapped by Donkey Kong. Remove rivets and jump over fireballs, with a score that starts high and counts down throughout the game.',
    image: donkey_kong,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/DoubleDunk-v5',
    description:
      'You are playing a 2v2 game of basketball. At the start of each possession, you select between a set of different plays and then execute them to either score or prevent your rivals from scoring.',
    image: double_dunk,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Earthworld-v5',
    description:
      'A quest to find the sword of Ultimate Sorcery. You must navigate through 12 zodiac-themed rooms in order to solve a puzzle.',
    image: earthworld,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/ElevatorAction-v5',
    description:
      'You are a secret agent that must retrieve some secret documents and reach the ground level of a building by going down an elevator/stairs. Once you reach the ground level, you are picked up and taken to the next level. You are equipped with a gun to defend yourself against enemy agents waiting for you in each floor. You gather points by shooting down enemy agents and visiting apartments marked with a red door, which contain the secret documents. This is an unreleased prototype based on the arcade game.',
    image: elevator_action,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Enduro-v5',
    description:
      'You are a racer in the National Enduro, a long-distance endurance race. You must overtake a certain amount of cars each day to stay on the race. The first day you need to pass 200 cars, and 300 foreach following day. The game ends if you do not meet your overtake quota for the day.',
    image: enduro,
    actions: [
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 8, label: 'LEFTFIRE' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { action: 7, label: 'RIGHTFIRE' },
      { action: 6, label: 'DOWNLEFT' },
      { key: 's', action: 4, label: 'DOWN (S)' },
      { action: 5, label: 'DOWNRIGHT' },
    ],
  },
  {
    name: 'ALE/Entombed-v5',
    description: 'You and your team of archeologists must navigate a maze filled with zombies.',
    image: entombed,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Et-v5',
    description:
      'Help E.T. (the extra-terrestrial) get home! He has to collect pieces of a telephone, call his ship, and get to the landing pad.',
    image: et,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/FishingDerby-v5',
    description: 'Your objective is to catch more sunfish than your opponent.',
    image: fishing_derby,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/FlagCapture-v5',
    description:
      'You are an explorer navigating from square to square, collecting clues, and looking for a flag.',
    image: flag_capture,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Freeway-v5',
    description:
      'Your objective is to guide your chicken across lane after lane of busy rush hour traffic. You receive a point for every chicken that makes it to the top of the screen after crossing all the lanes of traffic.',
    image: freeway,
    actions: [
      { key: 'w', action: 1, label: 'UP (W)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 's', action: 2, label: 'DOWN (S)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Frogger-v5',
    description:
      'You are a frog trying to make their way home. Cross a highway and a perilous river without being crushed or eaten.',
    image: frogger,
    actions: [
      { key: 'w', action: 1, label: 'UP (W)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { key: 's', action: 4, label: 'DOWN (S)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Frostbite-v5',
    description:
      'In Frostbite, the player controls “Frostbite Bailey” who hops back and forth across across an Arctic river, changing the color of the ice blocks from white to blue. Each time he does so, a block is added to his igloo.',
    image: frostbite,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Galaxian-v5',
    description:
      'Protect your laser base from a Galaxian invasion. Defeat each wave by firing lasers at the attackers.',
    image: galaxian,
    actions: [
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 5, label: 'LEFTFIRE' },
      { action: 4, label: 'RIGHTFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Gopher-v5',
    description:
      'The player controls a shovel-wielding farmer who protects a crop of three carrots from a gopher.',
    image: gopher,
    actions: [
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'w', action: 2, label: 'UP (W)' },
      { action: 5, label: 'UPFIRE' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { action: 7, label: 'LEFTFIRE' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { action: 6, label: 'RIGHTFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Gravitar-v5',
    description:
      'The player controls a small blue spacecraft. The game starts in a fictional solar system with several planets to explore. If the player moves his ship into a planet, he will be taken to a side-view landscape.',
    image: gravitar,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Hangman-v5',
    description:
      'Guess the hidden word one letter at a time, and don’t make too many incorrect guesses or you will lose. Word difficulty increases as you traverse through the games.',
    image: hangman,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/HauntedHouse-v5',
    description:
      'Explore a mansion haunted by the ghost of mean, old Samuel Graves. Your goal is to find three pieces of a magic urn and leave the mansion before losing your 9 lives.',
    image: haunted_house,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Hero-v5',
    description:
      'You need to rescue miners that are stuck in a mine shaft. You have access to various tools: a propeller backpack that allows you to fly wherever you want, sticks of dynamite that can be used to blast through walls, a laser beam to kill vermin, and a raft to float across stretches of lava. You have a limited amount of power. Once you run out, you lose a live.',
    image: hero,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/HumanCannonball-v5',
    description: 'Shoot a person out of a cannonball and try to get them into the water tower.',
    image: human_cannonball,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/IceHockey-v5',
    description:
      'Your goal is to score as many points as possible in a standard game of Ice Hockey over a 3-minute time period. The ball is usually called “the puck”. There are 32 shot angles ranging from the extreme left to the extreme right. The angles can only aim towards the opponent’s goal.Just as in real hockey, you can pass the puck by shooting it off the sides of the rink. This can be really key when you’re in position to score a goal.',
    image: ice_hockey,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Jamesbond-v5',
    description:
      'Your mission is to control Mr. Bond’s specially designed multipurpose craft to complete a variety of missions. The craft moves forward with a right motion and slightly back with a left motion. An up or down motion causes the craft to jump or dive. You can also fire by either lobbing a bomb to the bottom of the screen or firing a fixed angle shot to the top of the screen.',
    image: jamesbond,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/JourneyEscape-v5',
    description:
      'You must lead all 5 members of JOURNEY through waves of pesky characters and backstage obstacles to the Scarab Escape Vehicle before time runs out. You must also protect $50,000 in concert cash from grasping groupies, photographers, and promoters.',
    image: journey_escape,
    actions: [
      { action: 13, label: 'UPLEFTFIRE' },
      { action: 12, label: 'UPRIGHTFIRE' },
      { action: 6, label: 'UPLEFT' },
      { action: 5, label: 'UPRIGHT' },
      { key: 'w', action: 1, label: 'UP (W)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 10, label: 'LEFTFIRE' },
      { action: 9, label: 'RIGHTFIRE' },
      { key: 's', action: 4, label: 'DOWN (S)' },
      { action: 11, label: 'DOWNFIRE' },
      { action: 8, label: 'DOWNLEFT' },
      { action: 7, label: 'DOWNRIGHT' },
      { action: 15, label: 'DOWNLEFTFIRE' },
      { action: 14, label: 'DOWNRIGHTFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Kaboom-v5',
    description:
      'A mad bomber is dropping bombs! Try to catch each of them in a bucket of water before they hit the ground.',
    image: kaboom,
    actions: [
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Kangaroo-v5',
    description:
      'The object of the game is to score as many points as you can while controlling Mother Kangaroo to rescue her precious baby. You start the game with three lives. During this rescue mission, Mother Kangaroo encounters many obstacles. You need to help her climb ladders, pick bonus fruit, and throw punches at monkeys.',
    image: kangaroo,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/KeystoneKapers-v5',
    description:
      'You are a police officer (or ‘Kop’) trying to catch a ‘Krook’ as quickly as you can.',
    image: keystone_kapers,
    actions: [
      { action: 7, label: 'UPLEFT' },
      { action: 6, label: 'UPRIGHT' },
      { key: 'w', action: 2, label: 'UP (W)' },
      { action: 10, label: 'UPFIRE' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { action: 12, label: 'LEFTFIRE' },
      { action: 11, label: 'RIGHTFIRE' },
      { key: 's', action: 5, label: 'DOWN (S)' },
      { action: 13, label: 'DOWNFIRE' },
      { action: 9, label: 'DOWNLEFT' },
      { action: 8, label: 'DOWNRIGHT' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/KingKong-v5',
    description:
      'Climb the Empire State Building to save the person that King Kong kidnapped and placed there. Beware the bombs that King Kong throws at you as you climb!',
    image: king_kong,
    actions: [
      { key: 'w', action: 2, label: 'UP (W)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { key: 's', action: 5, label: 'DOWN (S)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Klax-v5',
    description:
      'Flip tumbling tiles into bins to create rows of three or more matching-colored tiles (such a row is called a Klax).',
    image: klax,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Koolaid-v5',
    description:
      'You are the Kool-Aid Man and you are trying to stop Thirsties from drinking your pool water by running into them.',
    image: koolaid,
    actions: [
      { action: 6, label: 'UPLEFT' },
      { key: 'w', action: 1, label: 'UP (W)' },
      { action: 5, label: 'UPRIGHT' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 8, label: 'DOWNLEFT' },
      { key: 's', action: 4, label: 'DOWN (S)' },
      { action: 7, label: 'DOWNRIGHT' },
    ],
  },
  {
    name: 'ALE/Krull-v5',
    description:
      'Your mission is to find and enter the Beast’s Black Fortress, rescue Princess Lyssa, and destroy the Beast.The task is not an easy one, for the location of the Black Fortress changes with each sunrise on Krull.',
    image: krull,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/KungFuMaster-v5',
    description:
      'You are a Kung-Fu Master fighting your way through the Evil Wizard’s temple. Your goal is to rescue Princess Victoria, defeating various enemies along the way.',
    image: kung_fu_master,
    actions: [
      { action: 11, label: 'UPLEFTFIRE' },
      { action: 10, label: 'UPRIGHTFIRE' },
      { key: 'w', action: 1, label: 'UP (W)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 8, label: 'LEFTFIRE' },
      { action: 7, label: 'RIGHTFIRE' },
      { key: 's', action: 4, label: 'DOWN (S)' },
      { action: 9, label: 'DOWNFIRE' },
      { action: 6, label: 'DOWNLEFT' },
      { action: 5, label: 'DOWNRIGHT' },
      { action: 13, label: 'DOWNLEFTFIRE' },
      { action: 12, label: 'DOWNRIGHTFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/LaserGates-v5',
    description:
      'The Cryptic Computer is malfunctioning! Use your Dante Dart to navigate through the computer and destroy the four Failsafe Detonators.',
    image: laser_gates,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/LostLuggage-v5',
    description: 'Catch falling luggage before it spills open on the ground.',
    image: lost_luggage,
    actions: [
      { action: 6, label: 'UPLEFT' },
      { key: 'w', action: 1, label: 'UP (W)' },
      { action: 5, label: 'UPRIGHT' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 8, label: 'DOWNLEFT' },
      { key: 's', action: 4, label: 'DOWN (S)' },
      { action: 7, label: 'DOWNRIGHT' },
    ],
  },
  {
    name: 'ALE/MarioBros-v5',
    description: 'Help Mario and Luigi knock pipe pests into a puddle of water.',
    image: mario_bros,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/MiniatureGolf-v5',
    description:
      'Hit a golf ball as few times as possible in order to get it into the hole, avoiding obstacles.',
    image: miniature_golf,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/MontezumaRevenge-v5',
    description:
      'Your goal is to acquire Montezuma’s treasure by making your way through a maze of chambers within the emperor’s fortress. You must avoid deadly creatures while collecting valuables and tools which can help you escape with the treasure.',
    image: montezuma_revenge,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/MrDo-v5',
    description: 'Help Mr. Do harvest apples before the bad guys get to him.',
    image: mr_do,
    actions: [
      { key: 'w', action: 2, label: 'UP (W)' },
      { action: 6, label: 'UPFIRE' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { action: 8, label: 'LEFTFIRE' },
      { action: 7, label: 'RIGHTFIRE' },
      { key: 's', action: 5, label: 'DOWN (S)' },
      { action: 9, label: 'DOWNFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/MsPacman-v5',
    description:
      'Your goal is to collect all of the pellets on the screen while avoiding the ghosts.',
    image: ms_pacman,
    actions: [
      { action: 6, label: 'UPLEFT' },
      { key: 'w', action: 1, label: 'UP (W)' },
      { action: 5, label: 'UPRIGHT' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 8, label: 'DOWNLEFT' },
      { key: 's', action: 4, label: 'DOWN (S)' },
      { action: 7, label: 'DOWNRIGHT' },
    ],
  },
  {
    name: 'ALE/NameThisGame-v5',
    description:
      'Your goal is to defend the treasure that you have discovered. You must fight off a shark and an octopus while keeping an eye on your oxygen supply.',
    image: name_this_game,
    actions: [
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { action: 5, label: 'LEFTFIRE' },
      { action: 4, label: 'RIGHTFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Othello-v5',
    description:
      'Take turns placing tiles of your color (white or black) on a grid. You can surround an opponents tiles to change their color to yours. The goals is to end the game with the most tiles of your color on the board.',
    image: othello,
    actions: [
      { action: 7, label: 'UPLEFT' },
      { key: 'w', action: 2, label: 'UP (W)' },
      { action: 6, label: 'UPRIGHT' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { action: 9, label: 'DOWNLEFT' },
      { key: 's', action: 5, label: 'DOWN (S)' },
      { action: 8, label: 'DOWNRIGHT' },
      { key: '1', action: 0, label: 'NOOP (1)' },
    ],
  },
  {
    name: 'ALE/Pacman-v5',
    description:
      'A classic arcade game. Move Pac Man around a maze collecting food and avoiding ghosts- unless you eat a Power Pellet, then you can eat the ghosts too!',
    image: pacman,
    actions: [
      { key: 'w', action: 1, label: 'UP (W)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { key: 's', action: 4, label: 'DOWN (S)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Phoenix-v5',
    description:
      'Your goal is to reach and shoot the alien pilot. On your way there, you must eliminate waves of war birds while avoiding their bombs.',
    image: phoenix,
    actions: [
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { action: 6, label: 'LEFTFIRE' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 5, label: 'RIGHTFIRE' },
      { key: 's', action: 4, label: 'DOWN (S)' },
      { action: 7, label: 'DOWNFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Pitfall-v5',
    description:
      'You control Pitfall Harry and are tasked with collecting all the treasures in a jungle within 20 minutes. You have three lives. The game is over if you collect all the treasures or if you die or if the time runs out.',
    image: pitfall,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Pitfall2-v5',
    description:
      'Navigate Peruvian caves searching for niece Rhonda and cat Quicklaw as well as the lost Raj diamond.',
    image: pitfall2,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Pong-v5',
    description:
      'You control the right paddle, you compete against the left paddle controlled by the computer. You each try to keep deflecting the ball away from your goal and into your opponent’s goal.',
    image: pong,
    actions: [
      {
        key: '1',
        action: 0,
        label: 'NOOP (1)',
      },
      {
        key: '2',
        action: 1,
        label: 'FIRE (2)',
      },
      {
        key: 'a',
        action: 3,
        label: 'LEFT (A)',
      },
      {
        key: 'd',
        action: 2,
        label: 'RIGHT (D)',
      },
      {
        action: 5,
        label: 'LEFTFIRE',
      },
      {
        action: 4,
        label: 'RIGHTFIRE',
      },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Pooyan-v5',
    description:
      'You are a mother pig protecting her piglets (Pooyans) from wolves. In the first scene, you can move up and down a rope. Try to shoot the worker’s balloons, while guarding yourself from attacks. If the wolves reach the ground safely they will get behind and try to eat you. In the second scene, the wolves try to float up. You have to try and stop them using arrows and bait. You die if a wolf eats you, or a stone or rock hits you.',
    image: pooyan,
    actions: [
      { key: 'w', action: 2, label: 'UP (W)' },
      { action: 4, label: 'UPFIRE' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 's', action: 3, label: 'DOWN (S)' },
      { action: 5, label: 'DOWNFIRE' },
    ],
    twoActionColumns: true,
  },
  // {
  //   name: 'ALE/PrivateEye-v5',
  //   description:
  //     'You control the French Private Eye Pierre Touche. Navigate the city streets, parks, secret passages, dead-ends and one-ways in search of the ringleader, Henri Le Fiend and his gang. You also need to find evidence and stolen goods that are scattered about. There are five cases, complete each case before its statute of limitations expires.',
  //   image: private_eye,
  //   actions: ALL_ACTIONS,
  // }, // Corrupted GIF - commented out
  {
    name: 'ALE/Qbert-v5',
    description:
      'You are Q*bert. Your goal is to change the color of all the cubes on the pyramid to the pyramid’s ‘destination’ color. To do this, you must hop on each cube on the pyramid one at a time while avoiding nasty creatures that lurk there.',
    image: qbert,
    actions: [
      { key: 'w', action: 2, label: 'UP (W)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { key: 's', action: 5, label: 'DOWN (S)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Riverraid-v5',
    description:
      'You control a jet that flies over a river, you can move it sideways and fire missiles to destroy enemy objects. Each time an enemy object is destroyed you score points (i.e. rewards). You lose a jet when you run out of fuel, fly over a fuel depot when you begin to run low. You lose a jet even when it collides with the river bank or one of the enemy objects (except fuel depots). The game begins with a squadron of three jets in reserve and you’re given an additional jet (up to 9) for each 10,000 points you score.',
    image: riverraid,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/RoadRunner-v5',
    description:
      'You control the Road Runner(TM) in a race; you can control the direction to run in and times to jumps. The goal is to outrun Wile E. Coyote(TM) while avoiding the hazards of the desert. The game begins with three lives. You lose a life when the coyote catches you, picks you up in a rocket, or shoots you with a cannon. You also lose a life when a truck hits you, you hit a land mine, you fall off a cliff,or you get hit by a falling rock. You score points (i.e. rewards) by eating seeds along the road, eating steel shot, and destroying the coyote.',
    image: road_runner,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Robotank-v5',
    description:
      'You control your Robot Tanks to destroy enemies and avoid enemy fire. Game ends when all of your Robot Tanks are destroyed or all 12 enemy squadrons are destroyed. The game begins with one active Robot Tank and three reserves. Your Robot Tank may get lost when it is hit by enemy rocket fire - your video scrambles with static interference when this happens - or just become damaged - sensors report the damage by flashing on your control panel (look at V/C/R/T squares). You earn one bonus Robot Tank for every enemy squadron destroyed. The maximum number of bonus Robot Tanks allowed at any one time is 12.',
    image: robotank,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Seaquest-v5',
    description:
      'You control a sub able to move in all directions and fire torpedoes. The goal is to retrieve as many divers as you can, while dodging and blasting enemy subs and killer sharks; points will be awarded accordingly. The game begins with one sub and three waiting on the horizon. Each time you increase your score by 10,000 points, an extra sub will be delivered to yourbase. You can only have six reserve subs on the screen at one time. Your sub will explode if it collides with anything except your own divers. The sub has a limited amount of oxygen that decreases at a constant rate during the game. When the oxygen tank is almost empty, you need to surface and if you don’t do it in time, your sub will blow up and you’ll lose one diver. Each time you’re forced to surface, with less than six divers, you lose one diver as well.',
    image: seaquest,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/SirLancelot-v5',
    description:
      'You control Sir Lancelot, riding atop Pegasus, and your goal is to save a prisoner locked in a castle and protected by a fire-breathing dragon.',
    image: sir_lancelot,
    actions: [
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 5, label: 'LEFTFIRE' },
      { action: 4, label: 'RIGHTFIRE' },
    ],
    twoActionColumns: true,
  },
  // {
  //   name: 'ALE/Skiing-v5',
  //   description:
  //     'You control a skier who can move sideways. The goal is to run through all gates (between the poles) in the fastest time. You are penalized five seconds for each gate you miss. If you hit a gate or a tree, your skier will jump back up and keep going.',
  //   image: skiing,
  //   actions: [
  //     { key: 'a', action: 2, label: 'LEFT (A)' },
  //     { key: '1', action: 0, label: 'NOOP (1)' },
  //     { key: 'd', action: 1, label: 'RIGHT (D)' },
  //   ],
  // }, // Corrupted GIF - commented out
  {
    name: 'ALE/Solaris-v5',
    description:
      'You control a spaceship. Blast enemies before they can blast you. You can warp to different sectors. You have to defend Federation planets, and destroy Zylon forces. Keep track of your fuel, if you run out you lose a life. Warp to a Federation planet to refuel. The game ends if all your ships are destroyed or if you reach the Solaris planet.',
    image: solaris,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/SpaceInvaders-v5',
    description:
      'Your objective is to destroy the space invaders by shooting your laser cannon at them before they reach the Earth. The game ends when all your lives are lost after taking enemy fire, or when they reach the earth.',
    image: space_invaders,
    actions: [
      {
        key: '1',
        action: 0,
        label: 'NOOP (1)',
      },
      {
        key: '2',
        action: 1,
        label: 'FIRE (2)',
      },
      {
        key: 'a',
        action: 3,
        label: 'LEFT (A)',
      },
      {
        key: 'd',
        action: 2,
        label: 'RIGHT (D)',
      },
      {
        action: 5,
        label: 'LEFTFIRE',
      },
      {
        action: 4,
        label: 'RIGHTFIRE',
      },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/SpaceWar-v5',
    description:
      'Use your Star Ship to compete in a sequence of games where you try to shoot your opponent as many times as possible without being hit yourself.',
    image: space_war,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/StarGunner-v5',
    description:
      'Stop the alien invasion by shooting down alien saucers and creatures while avoiding bombs.',
    image: star_gunner,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Superman-v5',
    description:
      'Play as Superman trying to capture Lex Luther and avoid the kryptonite satellites along the way.',
    image: superman,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Surround-v5',
    description: 'Surround your opponent without running into anything yourself.',
    image: surround,
    actions: [
      { key: 'w', action: 1, label: 'UP (W)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { key: 's', action: 4, label: 'DOWN (S)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Tennis-v5',
    description:
      'You control the orange player playing against a computer-controlled blue player. The game follows the rules of tennis. The first player to win at least 6 games with a margin of at least two games wins the match. If the score is tied at 6-6, the first player to go 2 games up wins the match.',
    image: tennis,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Tetris-v5',
    description:
      'Direct falling tile-based shapes to try and perfectly fill the board without leaving empty space.',
    image: tetris,
    actions: [
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { key: 's', action: 4, label: 'DOWN (S)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/TicTacToe3D-v5',
    description:
      'Players take turns placing their mark (an X or an O) on a 3-dimensional, 4 x 4 x 4 grid in an attempt to get 4 in a row before their opponent does.',
    image: tic_tac_toe_3d,
    actions: [
      { action: 7, label: 'UPLEFT' },
      { key: 'w', action: 2, label: 'UP (W)' },
      { action: 6, label: 'UPRIGHT' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { action: 9, label: 'DOWNLEFT' },
      { key: 's', action: 5, label: 'DOWN (S)' },
      { action: 8, label: 'DOWNRIGHT' },
      { key: '1', action: 0, label: 'NOOP (1)' },
    ],
  },
  {
    name: 'ALE/TimePilot-v5',
    description:
      'You control an aircraft. Use it to destroy your enemies. As you progress in the game, you encounter enemies with technology that is increasingly from the future.',
    image: time_pilot,
    actions: [
      { key: 'w', action: 2, label: 'UP (W)' },
      { action: 6, label: 'UPFIRE' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { action: 8, label: 'LEFTFIRE' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { action: 7, label: 'RIGHTFIRE' },
      { key: 's', action: 5, label: 'DOWN (S)' },
      { action: 9, label: 'DOWNFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Trondead-v5',
    description:
      'Use your deadly saucer to knock out encroaching opponents before they get to you.',
    image: trondead,
    actions: ALL_ACTIONS,
  },
  // {
  //   name: 'ALE/Turmoil-v5',
  //   description: 'Blast aliens while avoiding deadly collisions.',
  //   image: turmoil,
  //   actions: [
  //     { action: 7, label: 'UPLEFT' },
  //     { key: 'w', action: 2, label: 'UP (W)' },
  //     { action: 6, label: 'UPRIGHT' },
  //     { key: 'a', action: 4, label: 'LEFT (A)' },
  //     { key: '2', action: 1, label: 'FIRE (2)' },
  //     { key: 'd', action: 3, label: 'RIGHT (D)' },
  //     { action: 11, label: 'LEFTFIRE' },
  //     { key: '1', action: 0, label: 'NOOP (1)' },
  //     { action: 10, label: 'RIGHTFIRE' },
  //     { action: 9, label: 'DOWNLEFT' },
  //     { key: 's', action: 5, label: 'DOWN (S)' },
  //     { action: 8, label: 'DOWNRIGHT' },
  //   ],
  // }, // Corrupted GIF - commented out
  {
    name: 'ALE/Tutankham-v5',
    description:
      'Your goal is to rack up points by finding treasures in the mazes of the tomb while eliminating its guardians.',
    image: tutankham,
    actions: [
      { key: 'w', action: 1, label: 'UP (W)' },
      { action: 5, label: 'UPFIRE' },
      { key: 'a', action: 3, label: 'LEFT (A)' },
      { key: 'd', action: 2, label: 'RIGHT (D)' },
      { action: 7, label: 'LEFTFIRE' },
      { action: 6, label: 'RIGHTFIRE' },
      { key: 's', action: 4, label: 'DOWN (S)' },
      { key: '1', action: 0, label: 'NOOP (1)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/UpNDown-v5',
    description:
      'Your goal is to steer your baja bugger to collect prizes and eliminate opponents.',
    image: up_n_down,
    actions: [
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'w', action: 2, label: 'UP (W)' },
      { action: 4, label: 'UPFIRE' },
      { key: 's', action: 3, label: 'DOWN (S)' },
      { action: 5, label: 'DOWNFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/Venture-v5',
    description:
      'Your goal is to capture the treasure in every chamber of the dungeon while eliminating the monsters.',
    image: venture,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/VideoCheckers-v5',
    description:
      'Move your color pieces towards the opposite end of the board, jumping over opponents pieces to remove them from the board and gaining a king when you reach the other side.',
    image: video_checkers,
    actions: [
      { action: 2, label: 'UPLEFT' },
      { action: 1, label: 'UPRIGHT' },
      { action: 4, label: 'DOWNLEFT' },
      { action: 3, label: 'DOWNRIGHT' },
      { key: '2', action: 0, label: 'FIRE (2)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/VideoChess-v5',
    description: 'This is the usual game of chess, capture the opponents king.',
    image: video_chess,
    actions: [
      { action: 7, label: 'UPLEFT' },
      { key: 'w', action: 2, label: 'UP (W)' },
      { action: 6, label: 'UPRIGHT' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { action: 9, label: 'DOWNLEFT' },
      { key: 's', action: 5, label: 'DOWN (S)' },
      { action: 8, label: 'DOWNRIGHT' },
      { key: '1', action: 0, label: 'NOOP (1)' },
    ],
  },
  {
    name: 'ALE/VideoCube-v5',
    description:
      'Solve a Rubik’s cube in a nonstandard way, guide Hubie around the cube and swap tiles on the cubes face with one another until each face consists of only one color.',
    image: video_cube,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/VideoPinball-v5',
    description:
      'Your goal is to keep the ball in play as long as possible and to score as many points as possible.',
    image: video_pinball,
    actions: [
      { key: 'w', action: 2, label: 'UP (W)' },
      { action: 6, label: 'UPFIRE' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { action: 8, label: 'LEFTFIRE' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { action: 7, label: 'RIGHTFIRE' },
      { key: 's', action: 5, label: 'DOWN (S)' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/WizardOfWor-v5',
    description: 'Your goal is to beat the Wizard using your laser and radar scanner.',
    image: wizard_of_wor,
    actions: [
      { key: 'w', action: 2, label: 'UP (W)' },
      { action: 6, label: 'UPFIRE' },
      { key: '1', action: 0, label: 'NOOP (1)' },
      { key: '2', action: 1, label: 'FIRE (2)' },
      { key: 'a', action: 4, label: 'LEFT (A)' },
      { action: 8, label: 'LEFTFIRE' },
      { key: 'd', action: 3, label: 'RIGHT (D)' },
      { action: 7, label: 'RIGHTFIRE' },
      { key: 's', action: 5, label: 'DOWN (S)' },
      { action: 9, label: 'DOWNFIRE' },
    ],
    twoActionColumns: true,
  },
  {
    name: 'ALE/WordZapper-v5',
    description:
      'Shoot letters under time pressure in the prescribed order as they scroll across the screen.',
    image: word_zapper,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/YarsRevenge-v5',
    description:
      'The objective is to break a path through the shield and destroy the Qotile with a blast from the Zorlon Cannon.',
    image: yars_revenge,
    actions: ALL_ACTIONS,
  },
  {
    name: 'ALE/Zaxxon-v5',
    description:
      'Your goal is to stop the evil robot Zaxxon and its armies from enslaving the galaxy by piloting your fighter and shooting enemies.',
    image: zaxxon,
    actions: ALL_ACTIONS,
  },
];
