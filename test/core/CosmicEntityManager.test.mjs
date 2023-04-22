import { CosmicEntityManager, cosmicEntityManager } from '../../src/Core/CosmicEntity/CosmicEntityManager.mjs';

import { describe, beforeEach, it } from 'mocha';
import { expect } from 'chai';
import {spy} from 'sinon';
class EntityA {
  method1() {}
}

class EntityB {
  method2() {}
  method3() {}
}

describe('CosmicEntityManager', () => {
  let entityManager;

  beforeEach(() => {
    entityManager = new CosmicEntityManager();
  });

  describe('addEntity', () => {
    it('adds entity to entities map', () => {
      const entityA = new EntityA();
      entityManager.addEntity(entityA);

      expect(entityManager.entities.get('EntityA')).equal([entityA]);
    });

    it('adds entity to functions map', () => {
      const entityB = new EntityB();
      entityManager.addEntity(entityB);

      expect(entityManager.functions.get('method2')).equal([entityB]);
      expect(entityManager.functions.get('method3')).equal([entityB]);
    });
  });

  describe('removeEntity', () => {
    it('removes entity from entities map', () => {
      const entityA = new EntityA();
      entityManager.addEntity(entityA);

      expect(entityManager.entities.get('EntityA')).equal([entityA]);

      entityManager.removeEntity(entityA);

      expect(entityManager.entities.get('EntityA')).equal([]);
    });

    it('removes entity from functions map', () => {
      const entityB = new EntityB();
      entityManager.addEntity(entityB);

      expect(entityManager.functions.get('method2')).equal([entityB]);
      expect(entityManager.functions.get('method3')).equal([entityB]);

      entityManager.removeEntity(entityB);

      expect(entityManager.functions.get('method2')).equal([]);
      expect(entityManager.functions.get('method3')).equal([]);
    });
  });

  describe('invoke', () => {
    it('calls function on entities with that function', () => {
      const entityB = new EntityB();
      const spyMethod2 = spy(entityB, 'method2');
      const spyMethod3 = spy(entityB, 'method3');
      entityManager.addEntity(entityB);

      entityManager.invoke('method2');

      expect(spyMethod2).toHaveBeenCalledTimes(1);
      expect(spyMethod3).not.toHaveBeenCalled();
    });

    it('calls function with arguments', () => {
      const entityB = new EntityB();
      const spyMethod3 = spy(entityB, 'method3');
      entityManager.addEntity(entityB);

      entityManager.invoke('method3', 'arg1', 'arg2');

      expect(spyMethod3).toHaveBeenCalledWith('arg1', 'arg2');
    });
  });

  describe('getEntitiesByFunction', () => {
    it('returns array of entities with that function', () => {
      const entityB = new EntityB();
      entityManager.addEntity(entityB);

      expect(entityManager.getEntitiesByFunction('method2')).equal([entityB]);
    });

    it('returns empty array if no entities with that function', () => {
      expect(entityManager.getEntitiesByFunction('method4')).equal([]);
    });
  });

  describe('getEntitiesByType', () => {
    it('returns array of entities with that type', () => {
      const entityA1 = new EntityA();
      const entityA2 = new EntityA();
      entityManager.addEntity(entityA1);
      entityManager.addEntity(entityA2);

      expect(entityManager.getEntitiesByType('EntityA')).equal([entityA1, entityA2]);
    });

    it('returns empty array if no entities with that type', () => {
      expect(entityManager.getEntitiesByType('EntityC')).equal([]);
    });
  });
});