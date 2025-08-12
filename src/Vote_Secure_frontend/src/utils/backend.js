import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory, canisterId } from "../../../declarations/Vote_Secure_backend"; // Ensure these exist!

const LOCALHOST = "http://127.0.0.1:4943";

const setupActor = async () => {
  const agent = new HttpAgent({ host: LOCALHOST });

  await agent.fetchRootKey().catch((err) => {
    console.error("Could not fetch root key from local replica.");
    console.error(err);
  });

  return Actor.createActor(idlFactory, {
    agent,
    canisterId: canisterId, // use the auto-generated canisterId
  });
};

export const backendActorPromise = setupActor();
