import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
notesTable = dynamodb.Table(os.environ['dynamodbTable'])


def lambda_handler(event, context):
    # TODO implement
    username = event['username']
    notes = notesTable.query(KeyConditionExpression='username = :username',
                             ExpressionAttributeValues={
                                 ':username':  username},
                             ProjectionExpression='note,creation_timestamp')

    return {
        'statusCode': 200,
        'body': notes
    }
